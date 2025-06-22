import { BrowserRouter,Routes,Route ,Navigate,useParams,Link} from "react-router-dom"
import LoginApp  from './LoginApp';
import WelcomeSite  from './WelcomeSite';
import ErrorSite  from './ErrorSite';
import ListTodos  from './ListTodos';
import Header  from './Header';
import Footer  from './Footer';
import LogoutSite  from './LogoutSite';
import AuthProvider, { useAuthContext } from "./Security/AuthContext";
import TodoUpdateComponent from "./TodoUpdateComponent";

export default function TodoApp(){

    function AuthenticatedRoute({children}){
        const auth=useAuthContext()
        if(auth.isAuthenticated){
            return children
        }
        return <Navigate to="/"></Navigate>
        
    }
    
    return(
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Header/>
                        <Routes>
                            <Route path='/' element={<LoginApp/>}></Route>
                            <Route path='/login' element={<LoginApp/>}></Route>
                            
                            <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeSite/>
                            </AuthenticatedRoute>}></Route>
                            
                            <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodos/>
                            </AuthenticatedRoute>
                                }></Route>

                            <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoUpdateComponent/>
                            </AuthenticatedRoute>
                                }></Route>

                            <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutSite/>
                            </AuthenticatedRoute>
                                }></Route>
                        
                            <Route path='/*' element={<ErrorSite/>}></Route>
                        </Routes>
                    {/* <Footer/> */}
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}









