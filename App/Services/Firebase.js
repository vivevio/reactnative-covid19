import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/**
 * Example properties
 * {
        id: 1,
        image_url: 'https://imgix.kitabisa.com/57edfb17-b1a5-4db7-99cf-279f1a0ad4dc.jpg?ar=16:9&w=664&auto=format,compress',
        link: 'https://kitabisa.com/campaign/uniceflawancorona',
    }
 */

function getContributes() {
    return new Promise((resolve, reject) => {
        auth().signInAnonymously().then( async ()=> {
            const data = await firestore().collection('covid19').orderBy('id', 'asc').get();
            let collection = [];
            data.docs.map( doc => collection.push({...doc.data()}) )
            resolve(collection)
        }).catch((err)=>{
            console.log('sign in error', err)
            reject(err)
        })
    })
}


/**
 * Example properties
 * {
        id: 4,
        icon: 'alpha-d-circle',
        color: 'purple',
        text: 'Don\'t go outside if not necessary'
    }
 */
function getStepAdvices() {
    return new Promise((resolve, reject) => {
        auth().signInAnonymously().then( async ()=> {
            const data = await firestore().collection('advices').orderBy('id', 'asc').get();
            let collection = [];
            data.docs.map( doc => collection.push({...doc.data()}) )
            resolve(collection)
        }).catch((err)=>{
            console.log('sign in error', err)
            reject(err)
        })
    })
}


export {
    getContributes,
    getStepAdvices
}
  