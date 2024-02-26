import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export const ListItem = (props) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleShowIcon = () => {
        setIsHovered(prev => prev = true)
    }
    const handleHideIcon = () => {
        setIsHovered(prev => prev = false)
    }

    const items = props.toDoItems

    return (
        <ListGroup>
            {items.map((item, index) => {
                return (
                    <ListGroup.Item
                        className="d-flex justify-content-between align-items-center"
                        onMouseEnter={handleShowIcon}
                        onMouseLeave={handleHideIcon}
                    >
                        <p key={index.id} className="m-0">{item.label}</p>
                        {isHovered && (
                            <button role="button" className="btn p-0" onClick={props.onClick}>
                                <FaTrash style={{ height: '25px' }} />
                            </button>
                        )}
                    </ListGroup.Item>
                )
            })}
        </ListGroup >
    )
}