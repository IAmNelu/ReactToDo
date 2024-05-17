The age-old problem of managing state in React!

Yes, you're right that updating a single Todo item currently requires updating the entire `todos` array. This can lead to unnecessary re-renders and slow down your app.

One efficient way to deal with this is by using a technique called "Immutability" and an approach known as "Functional Updating".

Here's a simple example of how you could refactor your code:

```js
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [...initialTodos] }; // Create a new copy of the initial todos array when the component mounts.
  }

  updateTodo(id, updatedTodo) {
    const todos = [...this.state.todos]; // Create a new copy of the current state's todos array.
    const index = todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      todos[index] = { ...updatedTodo }; // Use the spread operator to create a new object and update the specific todo item.
      this.setState({ todos }); // Update the state with the updated todos array.
    }
  }

  render() {
    return (
      <div>
        {this.state.todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onEdit={(updatedTodo) => this.updateTodo(todo.id, updatedTodo)} />
        ))}
      </div>
    );
  }
}
```

In the above code:

1. We create a new copy of the initial todos array when the component mounts.
2. When updating a Todo item, we create a new copy of the current state's todos array.
3. We update the specific todo item by spreading the updatedTodo object over a new object.
4. Finally, we update the state with the updated todos array.

This way, you're not directly mutating the original state, which can lead to unexpected behavior and re-renders. Instead, you're creating new objects and arrays, which is
more efficient and predictable.

Additionally, using `React.memo` for your Todo component (if it's a controlled component) can help prevent unnecessary re-renders when the Todo item updates.

Lastly, consider using a library like `immer` or `reselect` that provides additional functionality to manage state in React. These libraries can simplify and improve 
performance by providing features like immutable updates, caching, and memoization.