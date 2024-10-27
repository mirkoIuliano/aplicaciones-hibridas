import React from 'react';
import NotasAdicionales from './NotasAdicionales';

const Table = ({ title, rows, notas }) => {
    console.log(rows);
    return (
        
        <div className="border-bottom border-black pb-3  mb-5">
            <h2 className="text-center mb-5">{title}</h2>
            <table className="table table-light table-hover w-100 mb-4">
                <thead>
                    <tr>
                        <th className="align-middle text-center" style={{ width: '15%' }}>Método</th>
                        <th className="align-middle" style={{ width: '50%' }}>Función</th>
                        <th className="align-middle" style={{ width: '35%' }}>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                    <tr key={index}>
                        <td className={`align-middle text-center fw-bold text-${row.methodColor}`}>
                        {row.method}
                        </td>
                        <td className="align-middle">{row.function}</td>
                        <td className="align-middle fw-bold">{row.url}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <NotasAdicionales notas={notas}/>

        </div>
        
        
    );
};

export default Table;
