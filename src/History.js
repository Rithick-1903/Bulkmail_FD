import { useEffect, useState } from "react";
import axios from "axios";

function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        axios.get("https://bulkmail-bd.onrender.com//history")
            .then((res) => {
                setHistory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    function deleteHistory(id) {

    axios.delete(`https://bulkmail-bd.onrender.com//history/${id}`)
    .then((res) => {

        if (res.data.success) {

            alert("History Deleted");

            setHistory(
                history.filter((item) => item._id !== id)
            );

        } else {

            alert("Delete Failed");
        }

    })
    .catch((err) => {
        console.log(err);
    });
}



    return (
        <div className="min-h-screen bg-blue-100 p-5">

            <h1 className="text-3xl font-bold text-center mb-5">
                Email History
            </h1>

            {
                history.length === 0 ?
                    <p className="text-center">No Email History Found</p>
                    :

                    history.map((item) => (
                        <div
                            key={item._id}
                            className="border p-4 m-2 rounded-md bg-gray-100"
                        >
                            <h3><b>Subject:</b> {item.subject}</h3>
                            <p><b>Status:</b> {item.status}</p>
                            <p><b>Recipients:</b> {item.recipients.length}</p>

                            <button
                                onClick={() => deleteHistory(item._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded mt-2"
                            >
                                Delete
                            </button>
                        </div>
                    ))
            }
            

        </div>
    );
}


export default History;