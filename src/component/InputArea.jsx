import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export const InputArea = (props) => {
    return (
        <InputGroup className="mb-3">
            <Form.Control
                size="lg"
                type="text"
                value={props.value}
                onChange={props.onChange}
                placeholder="What's needs to be done?"
                aria-label="What's needs to be done?"
            />
            <Button variant="outline-secondary" onClick={props.onClick}>
                Add
            </Button>
        </InputGroup>
    )
}