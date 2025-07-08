import React from "react";
import Home from "./Components/layouts/Home";
import Bonus from "./Components/layouts/Bonus";
import Profile from "./Components/Profile/Profile";

import LoginPage from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import VerifyOTP from "./Components/Auth/VerifyOTP";

import NewPassword from "./Components/Auth/NewPassword";

import AllGame from "./Components/layouts/AllGame";
import BetHistory from "./Components/layouts/BetHistory";
import AddBank from "./Components/layouts/AddBank";

// pages
import HowToPlay from "./Components/Pages/HowToPlay";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import TermsCondition from "./Components/Pages/TermsCondition";
// routes
import routes from "./Components/routes/route"; // Import route paths
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import StartingPage from "./Components/Pages/StartingPage";
import ReferEarn from "./Components/Pages/ReferEarn";
import StartingSlider from "./Components/Pages/StartingSlider";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Provider from "./Components/layouts/Provider";

// import UserEnter from "./Components/Pages/UserEnter";
import Menu from "./Components/Pages/Menu";
// import Withdraw from "./Components/Pages/Transactions/Withdraw";
import Deposit from "./Components/Pages/Transactions/Deposit/Deposit";
import WithdrawHistory from "./Components/Pages/Transactions/Withdraw/WithdrawHistory";
import ForgotOTP from "./Components/Auth/ForgotOTP";
import AccountDashboard from "./Components/Profile/AccountDashboard";
import DepositHistory from "./Components/Pages/Transactions/Deposit/DepositHistory";
// import Withdraw from "./Components/Pages/Transactions/Withdraw/WithdrawIndex";
import WithdrawIndex from "./Components/Pages/Transactions/Withdraw/WithdrawIndex";
import ChangePassword from "./Components/Profile/ChangePassword";
import FilteredGamesPage from "./Components/layouts/FilteredGamesPage";
import TurboGame from "./Components/layouts/TurboGame";
import SpribeGame from "./Components/layouts/SpribeGame";
import Providers from "./Components/layouts/Providers";
import FilteredProviderGamesPage from "./Components/layouts/Header/FilteredProviderGamesPage";
import Avatar from "./Components/Profile/Avatar";
import ResponsibleGaming from "./Components/Pages/Responsiblegame";
import SearchTopGames from "./Components/layouts/SearchTopGames";
import CountryRestrict from "./Components/Pages/CountryRestrict";
import AllGamesSearch from "./Components/layouts/AllGamesSearch";
import TemporaryContentPage from "./Components/Pages/TemporaryContentPage";

function App() {
  return (
    <>
      {/* <Router> */}
      <Routes>

          {/* Add the new Testing Info Page Route */}
         <Route path={routes.pages.testinginfo} element={<TemporaryContentPage />} />

        {/* Public Routes */}
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.games.all} element={<AllGame />} />
        <Route path={routes.games.topGames} element={<SearchTopGames />} />
        {/* <Route path={routes.games.topGames} element={<AllGamesSearch />} /> */}
        <Route path={routes.games.turbo} element={<TurboGame />} />
        <Route path={routes.games.spribe} element={<SpribeGame />} />
        <Route path={routes.games.providers} element={<Providers />} />
        <Route
          path={routes.games.filteredGames}
          element={<FilteredGamesPage />}
        />
        <Route
          path={routes.games.filteredProviderGames}
          element={<FilteredProviderGamesPage />}
        />
        <Route path={routes.pages.Restrict} element={<CountryRestrict />} />

        {/* Auth */}
        <Route path={routes.auth.login} element={<LoginPage />} />
        <Route path={routes.auth.register} element={<Register />} />
        <Route path={routes.auth.verifyOTP} element={<VerifyOTP />} />
        <Route path={routes.auth.forgotPassword} element={<ForgotPassword />} />
        <Route path={routes.auth.forgotOTP} element={<ForgotOTP />} />
        <Route path={routes.auth.newPassword} element={<NewPassword />} />
        <Route path={routes.auth.starting} element={<StartingPage />} />

        {/* Pages */}
        <Route path={routes.pages.privacyPolicy} element={<PrivacyPolicy />} />
        <Route path={routes.pages.terms} element={<TermsCondition />} />
        <Route path={routes.pages.privacy} element={<PrivacyPolicy />} />
        <Route
          path={routes.pages.responsiblegame}
          element={<ResponsibleGaming />}
        />
        <Route path={routes.pages.howToPlay} element={<HowToPlay />} />
        <Route path={routes.pages.referEarn} element={<ReferEarn />} />
        <Route path={routes.pages.slider} element={<StartingSlider />} />
        {/* <Route path={routes.pages.userEnter} element={<UserEnter />} /> */}
        <Route path={routes.pages.menu} element={<Menu />} />
        <Route path={routes.pages.provider} element={<Provider />} />
        <Route path={routes.games.bonus} element={<Bonus />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={routes.games.history} element={<BetHistory />} />
          <Route
            path={routes.transactions.withdrawHistory}
            element={<WithdrawHistory />}
          />
          <Route
            path={routes.transactions.depositHistory}
            element={<DepositHistory />}
          />

          <Route path={routes.transactions.addBank} element={<AddBank />} />

          {/* <Route path={routes.transactions.withdraw} element={<Withdraw />} /> */}
          <Route path={routes.transactions.deposit} element={<Deposit />} />

          <Route path={routes.profile.main} element={<Profile />} />
          <Route path={routes.profile.edit} element={<ProfileEdit />} />
          <Route
            path={routes.profile.changePassword}
            element={<ChangePassword />}
          />
          <Route path={routes.profile.avatar} element={<Avatar />} />
          <Route
            path={routes.account.dashboard}
            element={<AccountDashboard />}
          />
          <Route
            path={routes.transactions.withdraw}
            element={<WithdrawIndex />}
          />
        </Route>
      </Routes>
      {/* </Router> */}
    </>
  );
}

export default App;
