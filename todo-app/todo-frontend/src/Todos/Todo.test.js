import React from 'react'
import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom'
import Todo from './Todo'

test('todo text', () => {
    const todo = {
        text: "Testing todo",
        done: true
    }
    render(<Todo todo={todo} onClickDelete={() => () => true} onClickComplete={() => () => true}/>)
    expect(screen.getByTestId("todo-text")).toHaveTextContent("Testing todo")
})