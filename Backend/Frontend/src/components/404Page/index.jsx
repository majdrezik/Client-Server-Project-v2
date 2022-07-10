import React from 'react';


export default function Page404({ match }) {

    return (
        <div >
   <div class="container-fluid">

<div class="text-center">
    <div class="error mx-auto" data-text="404">404</div>
    <p class="lead text-gray-800 mb-5">Page Not Found</p>
    <br/>
    <a style={{background:"white"}} href="dashboard">&larr; Back to Dashboard</a>
</div>

</div>   </div>
 
        );
}

