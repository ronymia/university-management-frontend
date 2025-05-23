import { redirect } from "next/navigation";

const HomePage = () => {
  return redirect("/profile"); // Redirect to the login page
};

export default HomePage;
