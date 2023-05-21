const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({origin: true});

exports.refreshData = functions.pubsub.schedule('0 0 * * *').timeZone('GMT').onRun(async (context) =>  {
  try {
    // Get user's preferred reset frequency
    const user = await admin.auth().getUser(context.auth.uid);
    const docRef = admin.firestore().collection('users').doc(user.uid)
    const statementsRef = admin.firestore().collection('statements').doc(user.uid)
    
    const preferredFrequency = docRef.get()
    .then((doc) => {
        const documentData = doc.data();
        return documentData.income.frequency;
    })

    const weeklyPayday = docRef.get()
    .then((doc) => {
        const documentData = doc.data();
        if(documentData.frequency === 'weekly') {
          return Number(documentData.income?.payday);
        } else {
          return
        }
    })

    const currentDate = new Date();
    const currentDay = currentDate.getUTCDate();
    const currentMonth = currentDate.getMonth()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const month = months[currentMonth]

    console.log(currentDay)

    switch(preferredFrequency) {
      case 'bi-week':
        if(currentDay === 1 || currentDay === 15) {
          docRef.get()
          .then((doc) => {
              const data = doc.data();
              
              let expenses = []

              data?.fixedExpenses.forEach(expense => {
                expenses.push(Number(expense.amount))
              })

              data?.oneTimeExpenses.forEach(expense => {
                expenses.push(Number(expense?.amount))
              })

              let expensesSum = expenses.reduce(
                (accumulator, currentValue) => accumulator + currentValue, 0);
              let leftover = Number(data?.income.amount) - expensesSum - Number(data?.savings)

              statementsRef.get()
              .then((doc) => {
                if(doc.exists) {
                  const updatedArray = {
                    month,
                    currentDay,
                    income: data.income,
                    leftover,
                    savings: data.savings,
                    fixedExpenses: data.fixedExpenses,
                    oneTimeExpenses: data.oneTimeExpenses
                  };

                  statementsRef.update({statements:  admin.firestore.FieldValue.arrayUnion(updatedArray)})
                } else {
                  statementsRef.set({
                    statements: [
                      {
                        month,
                        currentDay,
                        income: data.income,
                        leftover,
                        savings: data.savings,
                        fixedExpenses: data.fixedExpenses,
                        oneTimeExpenses: data.oneTimeExpenses
                      }
                    ]
                  })
                }
              })
              docRef.update({
                ...data,
                oneTimeExpenses: [],
              })
          })
        }
        break;
        case 'weekly':
          const day = currentDate.getDay();
          if(day === weeklyPayday) {
            docRef.get()
            .then((doc) => {
              const data = doc.data();
              
              let expenses = []

              data?.fixedExpenses.forEach(expense => {
                expenses.push(Number(expense.amount))
              })

              data?.oneTimeExpenses.forEach(expense => {
                expenses.push(Number(expense?.amount))
              })

              let expensesSum = expenses.reduce(
                (accumulator, currentValue) => accumulator + currentValue, 0);
              let leftover = Number(data?.income.amount) - expensesSum - Number(data?.savings)

              statementsRef.get()
              .then((doc) => {
                if(doc.exists) {
                  const updatedArray = {
                    month,
                    currentDay,
                    income: data.income,
                    leftover,
                    savings: data.savings,
                    fixedExpenses: data.fixedExpenses,
                    oneTimeExpenses: data.oneTimeExpenses
                  };

                  statementsRef.update({statements:  admin.firestore.FieldValue.arrayUnion(updatedArray)})
                } else {
                  statementsRef.set({
                    statements: [
                      {
                        month,
                        currentDay,
                        income: data.income,
                        leftover,
                        savings: data.savings,
                        fixedExpenses: data.fixedExpenses,
                        oneTimeExpenses: data.oneTimeExpenses
                      }
                    ]
                  })
                }
              })
              docRef.update({
                ...data,
                oneTimeExpenses: [],
              })
          })
          }
          break;
      case 'monthly':
      default:
        if(currentDay === 1) {
          docRef.get()
          .then((doc) => {
              const data = doc.data();
              
              let expenses = []

              data?.fixedExpenses.forEach(expense => {
                expenses.push(Number(expense.amount))
              })

              data?.oneTimeExpenses.forEach(expense => {
                expenses.push(Number(expense?.amount))
              })

              let expensesSum = expenses.reduce(
                (accumulator, currentValue) => accumulator + currentValue, 0);
              let leftover = Number(data?.income.amount) - expensesSum - Number(data?.savings)

              statementsRef.get()
              .then((doc) => {
                if(doc.exists) {
                  const updatedArray = {
                    month,
                    currentDay,
                    income: data.income,
                    leftover,
                    savings: data.savings,
                    fixedExpenses: data.fixedExpenses,
                    oneTimeExpenses: data.oneTimeExpenses
                  };

                  statementsRef.update({statements:  admin.firestore.FieldValue.arrayUnion(updatedArray)})
                } else {
                  statementsRef.set({
                    statements: [
                      {
                        month,
                        currentDay,
                        income: data.income,
                        leftover,
                        savings: data.savings,
                        fixedExpenses: data.fixedExpenses,
                        oneTimeExpenses: data.oneTimeExpenses
                      }
                    ]
                  })
                }
              })
              docRef.update({
                ...data,
                oneTimeExpenses: [],
              })
          })
        }
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

exports.newUser = functions.auth.user().onCreate((user) => {
  
  return admin.firestore().collection('users').doc(user.uid).set({
    name: { firstName: user.displayName, lastName: '' },
    email: user.email,
    income: {
      amount: "",
      frequency: "",
      paymentDay: "",
    },
    savings: "",
    fixedExpenses: [],
    oneTimeExpenses: [],
  })
})

exports.deleteUser = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection('users').doc(user.uid)
  
  return doc.delete()
})