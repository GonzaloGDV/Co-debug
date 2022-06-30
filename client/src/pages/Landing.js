import React from "react";
import style from "./styles/Landing.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading.js";
import Footer from "../components/Footer.js";
import CardsQuestions from "../components/CardsQuestions.js";
import CardsQuestsLogOut from "../components/CardsQuestsLogOut.js";
import TopDiezRanking from "../components/TopDiezRanking";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { sendUserInfo } from "../redux/actions";


// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux"
// //Mandar pedido useEffect dispatch mi action >> pedido back >> res new object >

const Landing = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, isLoading, user } = useAuth0();
  const infoUsuario = useSelector(state=>state.user)
  const preguntas = infoUsuario.cantQuest
  const respuestas = infoUsuario.cantAns
  const position = infoUsuario.myPosition
  const tpoints = infoUsuario.myTeachPoints


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(sendUserInfo(user));
    }
  }, [dispatch, user, isAuthenticated]);



  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className={style.fullContainer}>
      {isAuthenticated ? (
        <div className={style.middleRow}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-8 ${style.col1}`}>
                <CardsQuestions />
              </div>

              <div className={`col-lg-4 ${style.col2}`}>
                <div className={`container-fluid${style.rigthContainer}`}>
                  <div className={`row ${style.rightRowTop}`}>
                    <div className={style.datosUser}>
                      <p className={style.estadisticas}>Mis estadísticas:</p>
                      <p>Mi posición en el Ranking: {position}</p>
                      <p>Mis Teach-Points: {tpoints}</p>
                      <p>Cuántas preguntas hice?   {preguntas}</p>
                      <p>Cuántas preguntas respondí?  {respuestas}</p>
                    </div>
                  </div>
                  <div className={`row ${style.rightRowUp}`}>
                    <div>
                      <p className={style.Titulo}>Hora de interactuar!</p>
                      <p className={style.subTitulo}>tu sitio de confianza</p>
                    </div>
                  </div>
                  <div className={`row ${style.rightRowMidle}`}>
                    <TopDiezRanking />
                  </div>
                  <div className={`row ${style.rightRowDown}`}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum." "Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum." "Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum."
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.total}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-6 ${style.colOutLeft}`}>
                <CardsQuestsLogOut />
              </div>
              <div className={`col-lg-6 ${style.colOutRigth}`}>
                <div className={`container-fluid${style.rigthContainer}`}>
                  <div className={`row ${style.rightRowUp}`}>
                    <div>
                      <p className={style.Titulo}>Bienvenido a CoDebug!</p>
                      <p className={style.subTitulo}>tu sitio de confianza</p>
                    </div>
                  </div>
                  <div className={`row ${style.rightRowMidle}`}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum." "Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum." "Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum."
                    
                  </div>
                  <div className={`row ${style.rightRowDown}`}>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum." "Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum." "Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
