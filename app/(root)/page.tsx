import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.action";


const Home = async () => {

    //const loggedIn = {firstName: 'Fiifi', lastName: 'Nobleson', email:'fiifinobleson@gmail.com'};
    const loggedIn = await getLoggedInUser();
    // const oneUser = await getLoggedInUser();
    // console.log("Name:" +  oneUser);

    return (
        <section className = "home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                    type = "greeting"
                    title = "Welcome"
                    user = {loggedIn?.name || 'Guest'}
                    subtext="Access and manage your accounts and transactions efficiently."
                    />

                         <TotalBalanceBox
                    accounts = {[]}
                    totalBanks = {1}
                    totalCurrentBalance = {130250.67}
                />
                </header>

                RECENT TRANSACTIONS

           
            </div>
            <RightSidebar 
            user={loggedIn}
            transactions = {[]}
            banks={[{currentBalance: 130250.67}, {currentBalance: 205550.67}]}
            />
        </section>
    )
}
export default Home;