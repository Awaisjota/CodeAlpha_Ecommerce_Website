import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer"
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
    <div className='flex bg-[#FFFFFF] flex-col min-h-screen'>

      <Navbar />

      <main className='flex-grow'>
        <AppRoutes />
      </main>

      <Footer />

    </div>
    </BrowserRouter>
  );
}

export default App;