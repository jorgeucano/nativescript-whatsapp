import { LoginComponent } from '../login/login.component';
import { CreateUserComponent } from '../login/create.user.component';
import { ChatListadoComponent } from '../chats/listado.component';
import { ChatComponent } from '../chat/chat.component'; 
export const router = [
    { path:"", redirectTo:"/login", pathMatch:"full"},
    { path:"login", component: LoginComponent},
    { path:"createUser", component: CreateUserComponent},
    { path:"chatListado", component: ChatListadoComponent},
    { path:"chat/:id", component:ChatComponent }
]    
