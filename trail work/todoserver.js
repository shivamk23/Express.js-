const express = require("express");
const app = express();
const fs = require("fs");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("."));

if (!fs.existsSync("task.txt")) {
  fs.writeFileSync("task.txt", "[]");
}

// Add a task to the list
app.post("/addTask", (req, res) => {
  const newTask = {
    task: req.body.task,
  };

  fs.readFile("task.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading task file");
      return;
    }

    const record = JSON.parse(data);
    record.push(newTask);

    fs.writeFile("task.txt", JSON.stringify(record, null, 2), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error writing task file");
        return;
      }

      console.log("Successfully added task");
      res.send("Task added successfully");
    });
  });
});

// Get all tasks
app.get("/allTasks", (req, res) => {
  fs.readFile("task.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading task file");
      return;
    }

    const tasks = JSON.parse(data);
    res.json(tasks);
  });
});

// Delete a task by its index
app.delete("/deleteTask/:index", (req, res) => {
  const indexToDelete = parseInt(req.params.index);

  fs.readFile("task.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading task file");
      return;
    }

    const tasks = JSON.parse(data);
    if (indexToDelete >= 0 && indexToDelete < tasks.length) {
      tasks.splice(indexToDelete, 1);

      fs.writeFile("task.txt", JSON.stringify(tasks, null, 2), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error writing task file");
          return;
        }

        console.log("Successfully deleted task");
        res.send("Task deleted successfully");
      });
    } else {
      res.status(400).send("Invalid task index");
    }
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server started on port 3000");
});
