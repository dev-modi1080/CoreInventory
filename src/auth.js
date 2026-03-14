import { supabase } from "./supabaseClient"

export async function login(email,password){

const { data, error } = await supabase.auth.signInWithPassword({
email: email,
password: password
})

if(error){
alert("Incorrect email or password")
return
}

alert("Login successful")
window.location.href="/dashboard.html"

}


export async function logout(){

await supabase.auth.signOut()

window.location.href="/login.html"

}