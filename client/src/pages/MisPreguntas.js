import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux" 
import { useAuth0 } from "@auth0/auth0-react";
import style from "./styles/MisPreguntas.module.css";
import Footer from "../components/Footer.js";
import CardUserQuestion from "../components/CardUserQuestion";
import FilterBar from "../components/FilterBar";
import SearchBar from '../components/SearchBar';
import { getUserQuestions, getUserQuestionsSearch } from "../redux/actions";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Paginated from "../components/Paginated";
import Loading from "../components/Loading";
import quest from '../images/question.png';
import { useNavigate } from "react-router-dom";

const MisPreguntas = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const user = useSelector(state=> state.user);
  const questions = useSelector(state => state.userQuestions);
  const dispatch = useDispatch();
  const totalPages = useSelector(state => state.totalPages);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('All');
  const [cantFirstLast, setCantFirstLast] = useState([questions.length, questions[0], questions[4]]);
  const [isModify, setIsModify] = useState(false);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect( () =>{
      if(page > 1 && page > totalPages) setPage(prev => prev-1)
      if(input.length > 0) {
        dispatch(getUserQuestionsSearch(user.sub, sort, page, input, setLoading))
      } else dispatch(getUserQuestions(user.sub, sort, page, setLoading))
  }, [dispatch, sort, cantFirstLast, page, user.sub, totalPages, input, isModify])

  
  function redirectQuest () {
    navigate('/preguntar')
  }

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if(loading){
    return (
      <div>
        <Loading />
      </div>
    );
  } else return (
    <div>
      {isAuthenticated ? (
        <div className={style.fullContainer}>
          {/* Acá el contenido para logueados */}
          <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.middleRow}`}>
              <div className={`col-lg-12 ${style.col1}`}>
                <div id={style.all}>
                  <div id={style.explore}>
                    <p> Mis preguntas</p>
                  </div>
                  <div id={style.filters}>
                      <div className={style.filterIcon}>
                        <FilterAltIcon fontSize='medium' />
                      </div>
                      <SearchBar setInput={setInput} setPage={setPage} />
                      <FilterBar sort={sort} setSort={setSort} setPage={setPage} />
                  </div>
                  <div id={style.myQuestions}>
                    {
                      questions.length > 0 ?
                      questions.map(q => {
                          return (
                            <CardUserQuestion key={q.id} id={q.id} title={q.title} text={q.text} likes={q.likes} 
                                              cantAnswers={q.cantAnswers} name={user.nickname}
                                              picture={user.picture} setCantFirstLast={setCantFirstLast}
                                              setIsModify={setIsModify} statusValidated={q.statusValidated} />
                          )
                      }) :
                      <div>
                          <button className={style.btnCreate} onClick={redirectQuest}>
                            Crea una nueva pregunta 
                            <img src={quest} alt='' className={style.imgQuest} height='20px' width='20px' />
                          </button>
                      </div>
                    }

                  </div>
                  <Paginated page={page} setPage={setPage} totalPages={totalPages}/>
                </div>
              </div>

              {/* <div className={`col-lg-2 ${style.col2}`}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </div> */}
            </div>
          </div>
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
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?"
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

export default MisPreguntas;
