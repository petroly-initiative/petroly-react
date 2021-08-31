import React from 'react';
import { useRouter } from 'next/router';
import ResetPasswordPage from '../../components/ResetPasswordPage';

const resetPasswordPage = () => {

const router = useRouter();

return (

    <ResetPasswordPage token={router.query.token} />

)

}

export default resetPasswordPage;