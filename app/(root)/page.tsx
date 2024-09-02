import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";


const Home = () => {

    const loggedIn = {firstName: 'Fiifi', lastName: 'Nobleson', email:'fiifinobleson@gmail.com'};

    return (
        <section className = "home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                    type = "greeting"
                    title = "Welcome"
                    user = {loggedIn?.firstName || 'Guest'}
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