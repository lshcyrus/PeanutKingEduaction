export function HandleError(error) {
  if (error.message.includes("401"))
    window.location = "https://peanutkingeducation.com/sign-in.html";
  else if (error.message.includes("404"))
    window.location = "./dashboard/index.html";
  else if (error.message.includes("403")) {
    window.alert("You do not have access to this course.")
    //window.location = "http://localhost:3000";
  }

}