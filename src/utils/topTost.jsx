import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const topTost = (message=null,type=null) => {
    MySwal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: (type && type=='success') || !type ? true : false,
        backdrop:false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    }).fire({
        icon:  type ?? 'success',
        title: message ?? 'Action Execute Successfully'
    });
}

export default topTost