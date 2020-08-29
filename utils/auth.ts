import { firestore, auth } from '../config/firebase';
import fire from '../config/firebase';
import Router from 'next/router';

const  createUser =  async (authUser: firebase.User) => {
    return firestore.collection('users').doc(authUser.uid).set({
        id: authUser.uid,
        email: authUser.email,
        name: authUser.displayName || ''
    })
}

export const signInWithGoogle = async () => {
    const provider = new fire.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider).then(async result => {
        if(result.additionalUserInfo.isNewUser) {
            await createUser(result.user)
        }

        Router.push('/phase/problem')

    })
  }