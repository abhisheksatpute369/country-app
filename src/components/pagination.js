import React from "react"

const Pagination = ({postperpage, totalpost, paginate})=>{
    const pagenumbers = [];

    for(let i = 1; i <= Math.ceil(totalpost/postperpage); i++)
    {
        pagenumbers.push(i);
    }
   return(
       <div>
           <ul className="pagination">
               {
                   pagenumbers.map((number)=>{
                        return(
                            <li key={number} className="page-item">
                            <a onClick={() =>paginate(number)} href="!#" className="page-link">{number}</a>
                            </li>
                        )
                   })
               }
           </ul>
       </div>
   )
}

export default Pagination;