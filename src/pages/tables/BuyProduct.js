import React, { useEffect, useState } from "react";

export default () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8000/buyproduct/transction', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data.data);
                } else {
                    throw new Error('Failed to fetch transactions');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h1>Transaction History</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd', }}>
                <thead>
                    <tr>
                        <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', }}>User ID</th>
                        <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', }}>Type</th>
                        <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', }}>Amount</th>
                        <th style={{ padding: '12px', textAlign: 'left', backgroundColor: '#f2f2f2', borderBottom: '1px solid #ddd', }}>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', }}>{transaction.userId}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', }}>{transaction.type}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', }}>{transaction.amount}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd', }}>{new Date(transaction.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
