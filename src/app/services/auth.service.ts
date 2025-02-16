import { inject, Injectable } from "@angular/core";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "@angular/fire/auth";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  auth = getAuth();
  USER = "user";
  CURRENT_USER = "current-User";

  router: Router = inject(Router);

  constructor(private readonly firestore: Firestore) {}

  /** Metodo para iniciar sesion con Google */
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    /** Retorna un metodo para iniciar sesion en una ventana emergente */
    return signInWithPopup(this.auth, provider);
  }

  /** Metodo para obtener un usuario de firebase por su Id */
  async getUserFromDb(userId: string) {
    const docRef = doc(this.firestore, this.USER, userId);
    const userDoc = await getDoc(docRef);
    return userDoc.data();
  }

  /** Metodo para obtener el usuario actual en Firebase */
  async getUserById() {
    const docRef = doc(this.firestore, this.USER, this.getCurrentUser().uid);
    const userDoc = await getDoc(docRef);
    return userDoc.data();
  }

  /** Metodo para agregar un usuario a la Firestore */
  addUserData(user: User, userData: { name: string } | null) {
    const collectionRef = collection(this.firestore, this.USER);
    const queryRef = query(collectionRef, where("userId", "==", user.uid));
    const allDocs = getDocs(queryRef).then(async (result) => {
      if (result.size === 0) {
        const docRef = doc(this.firestore, this.USER, user.uid);
        if (userData) {
          await setDoc(
            docRef,
            {
              fullName: userData !== null ? userData.name : "",
              userId: user.uid,
              profile: user.photoURL,
            },
            { merge: true }
          );
        } else {
          await setDoc(
            docRef,
            {
              fullName: user.displayName,
              userId: user.uid,
              profile: user.photoURL,
            },
            { merge: true }
          );
        }
      }
    });
  }

  /** Metodo para obtener el Id del usuario actual desde LocalStorage */
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.CURRENT_USER) || "{}") as User;
  }

  /** Metodo para guardar el usuario actual en LocalStorage */
  setCurrentUser(currentUser: User) {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(currentUser));
  }

  /** Metodo para cerrar la sesion del usuario */
  async logoutUser() {
    await signOut(this.auth);
    localStorage.clear();
    this.router.navigate(["login"]);
  }
}
