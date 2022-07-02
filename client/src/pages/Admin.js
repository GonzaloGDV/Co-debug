import React from "react";
import Footer from "../components/Footer.js";
//import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/Admin.module.css";
//import Loading from "../components/Loading.js";
import { useState, useEffect } from "react";
import Alertas from "../components/adminComponents/Alertas.js";
import ListaUsuarios from "../components/adminComponents/ListaUsuarios.js";
import AgregarAdmin from "../components/adminComponents/AgregarAdmin.js";
import PreguntasDirectas from "../components/adminComponents/PreguntasDirectas.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllMessages,
  getAllUsers,
  getAllAdmins,
  getAllUsersNoAdmin,
  getAllAlerts,
} from "../redux/actions";
// import Paginated from "../components/Paginated.js";

//Traemos "user.sub" que contiene el ID unico del usuario conectado para que podamos comparar el id y ver si puede estar acá.
// import { useAuth0 } from '@auth0/auth0-react'

const Admin = () => {
  // const { user } = useAuth0();
  //const { isAuthenticated, isLoading } = useAuth0();
  const isAuthenticated = true;
  const [optionSelected, setOptionSelected] = useState(null);
  //LISTA USUARIOS
  const [usersPage, setUsersPage] = useState(1);
  // const [flag, setFlag] = useState(true);
  const [banFlag, setBanFlag] = useState(true);
  //CONTACTO
  const [messagePage, setMessagePage] = useState(1);
  //ADMINS
  const [adminPage, setAdminPage] = useState(1);
  const [adminFlag, setAdminFlag] = useState(true);
  //ALERTS
  const [alertsPage, setAlertsPage] = useState(1);
  const [alertsFlag, setAlertsFlag] = useState(true);

  const [noAdminFlag, setNoAdminFlag] = useState(true);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers(usersPage));
  }, [dispatch, banFlag, usersPage]);

  useEffect(() => {
    dispatch(getAllMessages(messagePage));
  }, [dispatch, messagePage]);

  useEffect(() => {
    dispatch(getAllAdmins(adminPage));
  }, [dispatch, adminFlag, noAdminFlag, adminPage]);

  useEffect(() => {
    dispatch(getAllUsersNoAdmin(usersPage));
  }, [dispatch, adminFlag, usersPage]);

  useEffect(() => {
    dispatch(getAllAlerts(alertsPage));
    console.log(alertsFlag);
  }, [dispatch, alertsFlag, alertsPage]);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className={style.fullContainer}>
      {isAuthenticated ? (
        <div className={style.middleRow}>
          {!userInfo.statusAdmin ? (
            <div className={`container-fluid ${style.container}`}>
              <div className={`row ${style.middleRow}`}>
                <div className={`col-lg-2 ${style.col1}`}>
                  <div className="d-grid gap-2 mx-auto">
                    <p className={style.tittleLeft}>Admin Options</p>
                    <button
                      onClick={() =>
                        setOptionSelected(
                          <Alertas
                            alertsPage={alertsPage}
                            setAlertsPage={setAlertsPage}
                            setAlertsFlag={setAlertsFlag}
                          />
                        )
                      }
                      className="btn btn-warning"
                      type="button"
                    >
                      Alertas
                    </button>
                    <button
                      onClick={() =>
                        setOptionSelected(
                          <ListaUsuarios
                            setUsersPage={setUsersPage}
                            // setBanFlag={setBanFlag}
                            setBanFlag={setBanFlag}
                            usersPage={usersPage}
                          />
                        )
                      }
                      className="btn btn-warning"
                      type="button"
                    >
                      Lista usuarios
                    </button>
                    <button
                      onClick={() =>
                        setOptionSelected(
                          <AgregarAdmin
                            setFlag={setAdminFlag}
                            setNoAdminFlag={setNoAdminFlag}
                          />
                        )
                      }
                      className="btn btn-warning"
                      type="button"
                    >
                      Agregar Admin
                    </button>
                    <button
                      onClick={() =>
                        setOptionSelected(
                          <PreguntasDirectas
                            messagePage={messagePage}
                            setMessagePage={setMessagePage}
                          />
                        )
                      }
                      className="btn btn-warning"
                      data-toggle="button"
                      type="button"
                    >
                      Preguntas directas
                    </button>
                  </div>
                </div>

                <div className={`col-lg-10 ${style.col2}`}>
                  {optionSelected ? (
                    optionSelected
                  ) : (
                    <p>Panel de administrador</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {navigate("/")}
              <p>ERROR</p>
            </div>
          )}
        </div>
      ) : (
        <div className={style.total}>
          {/* Acá el contenido para no logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg ${style.colOut}`}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus id quod maxime placeat facere possimus, omnis voluptas
                assumenda est, omnis dolor repellendus. Temporibus autem
                quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                eveniet ut et voluptates repudiandae sint et molestiae non
                recusandae. Itaque earum rerum hic tenetur a sapiente delectus,
                ut aut reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat." "Sed ut perspiciatis
                unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam est, qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit, sed quia non numquam eius modi
                tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum exercationem
                ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
                commodi consequatur? Quis autem vel eum iure reprehenderit qui
                in ea voluptate velit esse quam nihil molestiae consequatur, vel
                illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
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

export default Admin;
