import { useEffect, useState } from "react";

function EventModal(props) {
    const { event, data = [] } = props || {};
    console.log("🚀 ~ EventModal ~ data:", data)

    const [isModalOpen, setModalOpen] = useState(false);
    console.log("🚀 ~ EventModal ~ isModalOpen:", isModalOpen)

    useEffect(() => {
        console.log("🚀 ~ EventModal ~ isModalOpen:", isModalOpen)
    }, [isModalOpen])

    return (<div className="modal-handler" onClick={()=>setModalOpen(true)}>
        <div className={`${event.toLowerCase()}-count`}>{event}: {data?.length}</div>
        {isModalOpen && <div className="modal-background"><div className="modal-container">
            <div className="cross-handler" onClick={(e) => {
                console.log("🚀 ~ e:", e, isModalOpen)
                e.stopPropagation();
                setModalOpen(false);
            }
            }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
            </div>
            <div className="modal-body">
                {
                    data.map(item => (<div className="modal-body-row">
                        {
                            ["serviceDate", "serviceType", "status", "carType", "timeSlot"].map(key => <div className="">
                                {key} - {item[key]}
                            </div>)
                        }
                    </div>))
                }
            </div>
        </div></div>}
    </div>)
}

export default EventModal;