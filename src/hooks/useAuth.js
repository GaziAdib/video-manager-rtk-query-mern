import { useSelector } from "react-redux";


export default function useAuth() {

    const auth = useSelector((state) => state?.auth);
    const localUser = localStorage.getItem('auth');
    const localAuthUser = JSON.parse(localUser);

    if ((auth?.accessToken && auth?.user) || (localAuthUser?.accessToken && localAuthUser?.user)) {
        return true;
    } else {
        return false;
    }

}