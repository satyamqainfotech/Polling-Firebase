let QuestionRef = ""
let votesCountForSamosa,
    votesCountForPakoda

const questions = db.collection('questions'),
samosaBtn = document.querySelector('#samosa'),
pakodaBtn = document.querySelector('#pakoda'),
samosaPercentage = document.querySelector('#samosa-percentage'),
pakodaPercentage = document.querySelector('#pakoda-percentage'),
samosaBar = document.querySelector('.samosa-bar'),
pakodaBar = document.querySelector('.pakoda-bar')

questions.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        QuestionRef = doc.id
        votesCountForSamosa = doc.data().options.samosa
        votesCountForPakoda = doc.data().options.pakoda
        samosaBtn.onclick = () => {
            updateVoteCount({option: 'samosa', count: ++votesCountForSamosa})
        }
        pakodaBtn.onclick = () => {
            updateVoteCount({option: 'pakoda', count: ++votesCountForPakoda})
        }
   })
})

const updateVoteCount = ({ option, count}) => {
    QuestionRef && questions.doc(QuestionRef).set({
        options: {
            [option]: count++
        }
    }, {merge: true})
}

questions.onSnapshot(snapshot => {
    const changes = snapshot.docChanges()
    changes.forEach(change => {
        let samosaVal = `${change.doc.data().options.samosa}%`
        let pakodaVal = `${change.doc.data().options.pakoda}%`
        samosaPercentage.innerText = samosaVal
        samosaBar.style.width = samosaVal
        pakodaPercentage.innerText = pakodaVal
        pakodaBar.style.width = pakodaVal
        
    })
})








// const questionsReference = db.collection('questions').doc()

// const a = questionsReference.get().then(doc => {
//     if (!doc.exists) {
//         console.log('No such document!');
//       } else {
//         console.log('Document data:', doc.data());
//       }
// })

// db.collection('questions').onSnapshot().then(snapshot => {
//     console.log(snapshot)
// })
// db.collection('questions').add({
//     label: 'something',
//     options: [
//         {
//             burger: {
//                 count: 0,
//                 price: 100
//             },
//             samosa: {
//                 count: 0,
//                 price: 10
//             }
//         }
//     ]
// }).then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })