import PostProducts from "../components/PostProducts";
import { useContext } from "react";
import { UserContext } from '../context/context';

export default function Admin() {
    const {user} = useContext(UserContext);
    return (
        <div>Holding place</div>
        <div>
            <div>
                {user ? 
                (<div>
                    Logged in: {JSON.stringify(user.user)}
                    {user.role === 'admin' ? 
                    (<div>
                        Hello Admin
                        
                    </div>)
                    :
                    (<div>
                        Not an Admin
                    </div>)
                    }
                </div>)
                :
                (<div>
                    Logged out.
                </div>)
                }
            </div>
        
        </div>
    );
}