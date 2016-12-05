import { LoginComponent } from '../login/login.component';
import { CreateUserComponent } from '../login/create.user.component';
import { ChatListadoComponent } from '../chats/listado.component'
export const router = [
    { path:"", redirectTo:"/login", pathMatch:"full"},
    { path:"login", component: LoginComponent},
    { path:"createUser", component: CreateUserComponent},
    { path:"chatListado", component: ChatListadoComponent}
]    
