import Image from "next/image";
import { Inter } from "next/font/google";
import { Provider } from 'react-redux';
import { store } from "@/redux/store";
import { HomeUser } from "@/Components/HomeUser";
import { Component } from "react";
import FlightCarousels from "@/Components/FlightCarousels";
import  VisaInformation  from "@/Components/VisaInformation";
import Footer from "@/Components/Footer";
import CancellationPolicy from "@/Components/CancellationPolicy";
import BaggagePolicy from "@/Components/BaggagePolicy";

export default function Home() {
  return (
    <Provider store={store}>
      <HomeUser />
      <FlightCarousels />
      <VisaInformation/>
      <CancellationPolicy/>
      <BaggagePolicy/>
      <Footer/>
    </Provider>
  );
}
