import { useContext } from "react";
import { UserContext } from '../context/context';

export default function Admin() {
    const {user} = useContext(UserContext);
    return (
        <div>
            <div>
                {user ? 
                (<div className="py-1 m-3">
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
                (<div className="py-1 m-3">
                    Logged out.
                </div>)
                }
            </div>
        </div>
    );
}