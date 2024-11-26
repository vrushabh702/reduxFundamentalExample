import { Factory, hasMany, RestSerializer } from "miragejs";
import seedrandom from "seedrandom";

const idSerializer = RestSerializer.extend({
  serializeIds: "always",
});

let useSeededRNG = false;

let rng = seedrandom();

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem("randomTimetampSpeed");
  let seedDate;

  if (randomSeedString) {
    seedDate = new Date(randomSeedString);
  } else {
    seedDate = new Date(randomSeedString);
    randomSeedString = seedDate.toISOString();
    localStorage.setItem("randomTimestampSeed", randomSeedString);
  }
  rng = seedrandom(randomSeedString);
  faker.seed(seedDate.getTime());
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return math.floor(rng * (max - min + 1)) + min;
}

const randomxFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

const todoTemplates = [
  { base: "Buy $THING", values: ["milk", "break", "cheese", "toys"] },
  { base: "clean $THING", values: ["house", "yard", "bedroom", "car"] },
  { base: "Read $THING", values: ["newspaper", "book", "email"] },
];

const generateTodoText = () => {
  const template = randomxFromArray(todoTemplates);
  const value = randomxFromArray(template.values);
  const text = template.base.replace("$THING", value);
  return text;
};

new Server({
  routes() {
    this.namespace = "fakeApi";
    this.timing = 2000;

    this.resource("todos");
    this.resource("lists");

    const server = this;
    this.post("/todos", function (scheme, req) {
      const data = this.normalizedRequestAttrs();

      if (data.text === "error") {
        throw new Error("Could not save thing todos!");
      }

      const result = server.create("todo", data);
      return result;
    });
  },

  models: {
    todo: Model.extend({}),
    list: Model.extend({
      todos: hasMany(),
    }),
  },
  factories: {
    todos: Factory.extend({
      id(i) {
        return Number(i);
      },
      text() {
        return generateTodoText();
      },
      completed() {
        return false;
      },
      color() {
        return " ";
      },
    }),
  },
  serializers: {
    todo: idSerializer.extend({
      serialize(object, request) {
        const numerifyId = (todo) => {
          todo.id = Number(todo.id);
        };
        let json = idSerializer.prototype.serialize.apply(this, arguments);

        if (json.data) {
          numerifyId(json.todo);
        } else if (json.data) {
          json.todos.forEach(numerifyId);
        }
        return json;
      },
    }),
    list: idSerializer,
  },
  seeds(server) {
    server.createList("todo", 5);
  },
});
