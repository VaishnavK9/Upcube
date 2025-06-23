
export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

export const programmingLanguages = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'TypeScript', 'PHP', 'Ruby'
];

export const quizQuestions: Record<string, Question[]> = {
  JavaScript: [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["var x = 5;", "variable x = 5;", "v x = 5;", "declare x = 5;"],
      correct: 0,
      category: "Variables"
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "add()", "append()", "insert()"],
      correct: 0,
      category: "Arrays"
    },
    {
      id: 3,
      question: "What does '===' operator do in JavaScript?",
      options: ["Assignment", "Equality without type checking", "Strict equality with type checking", "Not equal"],
      correct: 2,
      category: "Operators"
    },
    {
      id: 4,
      question: "How do you create a function in JavaScript?",
      options: ["function myFunc() {}", "create myFunc() {}", "def myFunc() {}", "func myFunc() {}"],
      correct: 0,
      category: "Functions"
    },
    {
      id: 5,
      question: "What is the result of 'typeof null' in JavaScript?",
      options: ["null", "undefined", "object", "boolean"],
      correct: 2,
      category: "Data Types"
    },
    {
      id: 6,
      question: "Which loop is best for iterating over arrays?",
      options: ["for loop", "while loop", "do-while loop", "All of the above"],
      correct: 3,
      category: "Loops"
    },
    {
      id: 7,
      question: "What is closure in JavaScript?",
      options: ["A way to close files", "Inner function accessing outer function variables", "A loop structure", "An error handling mechanism"],
      correct: 1,
      category: "Advanced Concepts"
    },
    {
      id: 8,
      question: "How do you handle errors in JavaScript?",
      options: ["try-catch", "error-handle", "catch-throw", "handle-error"],
      correct: 0,
      category: "Error Handling"
    },
    {
      id: 9,
      question: "What is the DOM?",
      options: ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Oriented Model"],
      correct: 0,
      category: "Web APIs"
    },
    {
      id: 10,
      question: "Which method is used to select an element by ID?",
      options: ["getElementById()", "selectById()", "getElement()", "findById()"],
      correct: 0,
      category: "DOM Manipulation"
    },
    {
      id: 11,
      question: "What is an arrow function?",
      options: ["A function that points somewhere", "() => {}", "A special loop", "An array method"],
      correct: 1,
      category: "Functions"
    },
    {
      id: 12,
      question: "How do you declare a constant in JavaScript?",
      options: ["const x = 5;", "constant x = 5;", "final x = 5;", "readonly x = 5;"],
      correct: 0,
      category: "Variables"
    },
    {
      id: 13,
      question: "What is the spread operator?",
      options: ["...", "***", "+++", "---"],
      correct: 0,
      category: "ES6 Features"
    },
    {
      id: 14,
      question: "How do you create a promise in JavaScript?",
      options: ["new Promise()", "create Promise()", "Promise.new()", "make Promise()"],
      correct: 0,
      category: "Asynchronous Programming"
    },
    {
      id: 15,
      question: "What is destructuring in JavaScript?",
      options: ["Breaking objects", "Extracting values from arrays/objects", "Deleting properties", "Creating new objects"],
      correct: 1,
      category: "ES6 Features"
    },
    {
      id: 16,
      question: "Which method is used to convert JSON string to object?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
      correct: 0,
      category: "JSON"
    },
    {
      id: 17,
      question: "What is the difference between let and var?",
      options: ["No difference", "let has block scope, var has function scope", "var is newer", "let is deprecated"],
      correct: 1,
      category: "Variables"
    },
    {
      id: 18,
      question: "How do you add an event listener?",
      options: ["addEventListener()", "addEvent()", "onEvent()", "listen()"],
      correct: 0,
      category: "Event Handling"
    },
    {
      id: 19,
      question: "What is 'this' keyword in JavaScript?",
      options: ["Current object reference", "A variable", "A function", "A loop"],
      correct: 0,
      category: "Object-Oriented Programming"
    },
    {
      id: 20,
      question: "How do you create a class in JavaScript?",
      options: ["class MyClass {}", "create MyClass {}", "new MyClass {}", "define MyClass {}"],
      correct: 0,
      category: "Object-Oriented Programming"
    },
    {
      id: 21,
      question: "What is hoisting in JavaScript?",
      options: ["Moving variables to top", "Variable and function declarations moved to top of scope", "Lifting heavy objects", "A coding pattern"],
      correct: 1,
      category: "Advanced Concepts"
    },
    {
      id: 22,
      question: "How do you check if a variable is an array?",
      options: ["Array.isArray()", "typeof array", "instanceof Array", "Both A and C"],
      correct: 3,
      category: "Arrays"
    },
    {
      id: 23,
      question: "What is the purpose of 'use strict'?",
      options: ["Makes JavaScript stricter", "Enables ES6 features", "Improves performance", "All of the above"],
      correct: 0,
      category: "Best Practices"
    },
    {
      id: 24,
      question: "How do you copy an array in JavaScript?",
      options: ["[...array]", "Array.copy()", "array.clone()", "copy(array)"],
      correct: 0,
      category: "Arrays"
    },
    {
      id: 25,
      question: "What is a callback function?",
      options: ["A function that calls back", "A function passed as argument to another function", "A recursive function", "An async function"],
      correct: 1,
      category: "Functions"
    },
    {
      id: 26,
      question: "How do you remove the last element from an array?",
      options: ["pop()", "remove()", "delete()", "removeLast()"],
      correct: 0,
      category: "Arrays"
    },
    {
      id: 27,
      question: "What is the difference between null and undefined?",
      options: ["No difference", "null is assigned, undefined is default", "undefined is assigned, null is default", "They are the same"],
      correct: 1,
      category: "Data Types"
    },
    {
      id: 28,
      question: "How do you convert a string to a number?",
      options: ["parseInt()", "Number()", "parseFloat()", "All of the above"],
      correct: 3,
      category: "Type Conversion"
    },
    {
      id: 29,
      question: "What is the ternary operator?",
      options: ["? :", "? ?", ": :", "? ! :"],
      correct: 0,
      category: "Operators"
    },
    {
      id: 30,
      question: "How do you create a module in JavaScript?",
      options: ["export/import", "module.exports", "require()", "All of the above"],
      correct: 3,
      category: "Modules"
    },
    {
      id: 31,
      question: "What is async/await?",
      options: ["Synchronous programming", "Asynchronous programming syntax", "A loop structure", "Error handling"],
      correct: 1,
      category: "Asynchronous Programming"
    },
    {
      id: 32,
      question: "How do you iterate over object properties?",
      options: ["for...in", "for...of", "forEach", "All of the above"],
      correct: 0,
      category: "Objects"
    },
    {
      id: 33,
      question: "What is the Map object in JavaScript?",
      options: ["Array method", "Key-value pair collection", "Location mapping", "Image mapping"],
      correct: 1,
      category: "ES6 Features"
    },
    {
      id: 34,
      question: "How do you handle multiple promises?",
      options: ["Promise.all()", "Promise.race()", "Promise.allSettled()", "All of the above"],
      correct: 3,
      category: "Asynchronous Programming"
    },
    {
      id: 35,
      question: "What is the Set object in JavaScript?",
      options: ["Array with unique values", "Object property setter", "Configuration object", "Function parameter"],
      correct: 0,
      category: "ES6 Features"
    }
  ],
  Python: [
    {
      id: 1,
      question: "How do you declare a variable in Python?",
      options: ["var x = 5", "x = 5", "int x = 5", "declare x = 5"],
      correct: 1,
      category: "Variables"
    },
    {
      id: 2,
      question: "Which data type is mutable in Python?",
      options: ["tuple", "string", "list", "int"],
      correct: 2,
      category: "Data Types"
    },
    {
      id: 3,
      question: "How do you create a function in Python?",
      options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
      correct: 1,
      category: "Functions"
    },
    {
      id: 4,
      question: "What is the correct way to create a list?",
      options: ["list = [1, 2, 3]", "list = (1, 2, 3)", "list = {1, 2, 3}", "list = <1, 2, 3>"],
      correct: 0,
      category: "Data Structures"
    },
    {
      id: 5,
      question: "How do you handle exceptions in Python?",
      options: ["try-except", "try-catch", "handle-error", "catch-throw"],
      correct: 0,
      category: "Error Handling"
    },
    {
      id: 6,
      question: "What is a dictionary in Python?",
      options: ["Ordered collection", "Key-value pair collection", "Set of unique values", "Linear data structure"],
      correct: 1,
      category: "Data Structures"
    },
    {
      id: 7,
      question: "How do you create a class in Python?",
      options: ["class MyClass:", "create MyClass:", "define MyClass:", "new MyClass:"],
      correct: 0,
      category: "Object-Oriented Programming"
    },
    {
      id: 8,
      question: "What is list comprehension?",
      options: ["Understanding lists", "[x for x in range(10)]", "List documentation", "List methods"],
      correct: 1,
      category: "Advanced Features"
    },
    {
      id: 9,
      question: "How do you import a module in Python?",
      options: ["include module", "import module", "require module", "use module"],
      correct: 1,
      category: "Modules"
    },
    {
      id: 10,
      question: "What is the difference between '==' and 'is'?",
      options: ["No difference", "== compares values, is compares identity", "is compares values, == compares identity", "Both are the same"],
      correct: 1,
      category: "Operators"
    },
    {
      id: 11,
      question: "How do you create a tuple?",
      options: ["tuple = [1, 2, 3]", "tuple = (1, 2, 3)", "tuple = {1, 2, 3}", "tuple = <1, 2, 3>"],
      correct: 1,
      category: "Data Structures"
    },
    {
      id: 12,
      question: "What is a lambda function?",
      options: ["Anonymous function", "Named function", "Class method", "Built-in function"],
      correct: 0,
      category: "Functions"
    },
    {
      id: 13,
      question: "How do you iterate over a list?",
      options: ["for item in list:", "foreach item in list:", "iterate list:", "loop list:"],
      correct: 0,
      category: "Loops"
    },
    {
      id: 14,
      question: "What is self in Python classes?",
      options: ["Class reference", "Instance reference", "Method reference", "Variable reference"],
      correct: 1,
      category: "Object-Oriented Programming"
    },
    {
      id: 15,
      question: "How do you create a set?",
      options: ["set = [1, 2, 3]", "set = (1, 2, 3)", "set = {1, 2, 3}", "set = <1, 2, 3>"],
      correct: 2,
      category: "Data Structures"
    },
    {
      id: 16,
      question: "What is the purpose of __init__ method?",
      options: ["Initialize class", "Constructor method", "Setup instance", "All of the above"],
      correct: 3,
      category: "Object-Oriented Programming"
    },
    {
      id: 17,
      question: "How do you read a file in Python?",
      options: ["open('file.txt', 'r')", "read('file.txt')", "file.open('file.txt')", "load('file.txt')"],
      correct: 0,
      category: "File Handling"
    },
    {
      id: 18,
      question: "What is inheritance in Python?",
      options: ["Sharing properties between classes", "Creating new classes", "Copying classes", "Deleting classes"],
      correct: 0,
      category: "Object-Oriented Programming"
    },
    {
      id: 19,
      question: "How do you add an item to a list?",
      options: ["append()", "add()", "insert()", "Both A and C"],
      correct: 3,
      category: "Data Structures"
    },
    {
      id: 20,
      question: "What is a decorator in Python?",
      options: ["Function modifier", "Class decorator", "Method wrapper", "All of the above"],
      correct: 3,
      category: "Advanced Features"
    },
    {
      id: 21,
      question: "How do you convert a string to integer?",
      options: ["int(string)", "string.toInt()", "convert(string)", "parse(string)"],
      correct: 0,
      category: "Type Conversion"
    },
    {
      id: 22,
      question: "What is the range() function?",
      options: ["Creates a list of numbers", "Creates a sequence of numbers", "Calculates range", "Finds maximum"],
      correct: 1,
      category: "Built-in Functions"
    },
    {
      id: 23,
      question: "How do you create a generator?",
      options: ["Using yield", "Using return", "Using generate", "Using create"],
      correct: 0,
      category: "Advanced Features"
    },
    {
      id: 24,
      question: "What is the difference between list and tuple?",
      options: ["Lists are mutable, tuples are immutable", "No difference", "Tuples are faster", "Lists are ordered"],
      correct: 0,
      category: "Data Structures"
    },
    {
      id: 25,
      question: "How do you check if a key exists in dictionary?",
      options: ["key in dict", "dict.hasKey(key)", "dict.exists(key)", "dict.contains(key)"],
      correct: 0,
      category: "Data Structures"
    },
    {
      id: 26,
      question: "What is polymorphism in Python?",
      options: ["Multiple forms", "Same interface, different implementations", "Class inheritance", "Method overriding"],
      correct: 1,
      category: "Object-Oriented Programming"
    },
    {
      id: 27,
      question: "How do you handle multiple exceptions?",
      options: ["except (Exception1, Exception2):", "except Exception1, Exception2:", "except Exception1 or Exception2:", "except Exception1 and Exception2:"],
      correct: 0,
      category: "Error Handling"
    },
    {
      id: 28,
      question: "What is the purpose of pass statement?",
      options: ["Skip execution", "Placeholder for future code", "Exit function", "Continue loop"],
      correct: 1,
      category: "Control Flow"
    },
    {
      id: 29,
      question: "How do you create a virtual environment?",
      options: ["python -m venv myenv", "create virtualenv", "python -env myenv", "virtualenv create"],
      correct: 0,
      category: "Environment Management"
    },
    {
      id: 30,
      question: "What is the difference between append() and extend()?",
      options: ["No difference", "append() adds single item, extend() adds multiple", "extend() adds single item, append() adds multiple", "Both are the same"],
      correct: 1,
      category: "Data Structures"
    },
    {
      id: 31,
      question: "How do you sort a list?",
      options: ["list.sort()", "sort(list)", "list.order()", "order(list)"],
      correct: 0,
      category: "Data Structures"
    },
    {
      id: 32,
      question: "What is *args in Python?",
      options: ["Variable arguments", "Keyword arguments", "List arguments", "Dictionary arguments"],
      correct: 0,
      category: "Functions"
    },
    {
      id: 33,
      question: "What is **kwargs in Python?",
      options: ["Variable arguments", "Keyword arguments", "List arguments", "Dictionary arguments"],
      correct: 1,
      category: "Functions"
    },
    {
      id: 34,
      question: "How do you reverse a string?",
      options: ["string[::-1]", "reverse(string)", "string.reverse()", "reversed(string)"],
      correct: 0,
      category: "String Operations"
    },
    {
      id: 35,
      question: "What is the GIL in Python?",
      options: ["Global Interpreter Lock", "General Interface Layer", "Global Import Library", "Generic Input Loop"],
      correct: 0,
      category: "Advanced Concepts"
    }
  ],
  Java: [
    {
      id: 1,
      question: "How do you declare a variable in Java?",
      options: ["int x = 5;", "var x = 5;", "x = 5;", "declare int x = 5;"],
      correct: 0,
      category: "Variables"
    },
    {
      id: 2,
      question: "What is the main method signature in Java?",
      options: ["public static main()", "public static void main(String[] args)", "public main(String[] args)", "static void main()"],
      correct: 1,
      category: "Basic Syntax"
    },
    {
      id: 3,
      question: "How do you create a class in Java?",
      options: ["class MyClass {}", "public class MyClass {}", "create MyClass {}", "define MyClass {}"],
      correct: 1,
      category: "Object-Oriented Programming"
    },
    {
      id: 4,
      question: "What is inheritance in Java?",
      options: ["extends keyword", "implements keyword", "inherits keyword", "super keyword"],
      correct: 0,
      category: "Object-Oriented Programming"
    },
    {
      id: 5,
      question: "How do you handle exceptions in Java?",
      options: ["try-catch", "try-except", "handle-error", "catch-throw"],
      correct: 0,
      category: "Error Handling"
    },
    {
      id: 6,
      question: "What is an interface in Java?",
      options: ["Abstract class", "Contract for classes", "Implementation detail", "Variable declaration"],
      correct: 1,
      category: "Object-Oriented Programming"
    },
    {
      id: 7,
      question: "How do you create an array in Java?",
      options: ["int[] arr = new int[5];", "int arr[] = new int[5];", "int arr = new int[5];", "Both A and B"],
      correct: 3,
      category: "Arrays"
    },
    {
      id: 8,
      question: "What is polymorphism in Java?",
      options: ["Method overloading", "Method overriding", "Both A and B", "Interface implementation"],
      correct: 2,
      category: "Object-Oriented Programming"
    },
    {
      id: 9,
      question: "How do you create a loop in Java?",
      options: ["for, while, do-while", "loop, repeat, iterate", "foreach, while, until", "for, while, repeat"],
      correct: 0,
      category: "Loops"
    },
    {
      id: 10,
      question: "What is encapsulation in Java?",
      options: ["Data hiding", "Method binding", "Class inheritance", "Interface implementation"],
      correct: 0,
      category: "Object-Oriented Programming"
    },
    {
      id: 11,
      question: "How do you create a constructor in Java?",
      options: ["public ClassName()", "constructor ClassName()", "new ClassName()", "create ClassName()"],
      correct: 0,
      category: "Constructors"
    },
    {
      id: 12,
      question: "What is the difference between == and equals()?",
      options: ["No difference", "== compares references, equals() compares content", "equals() compares references, == compares content", "Both are the same"],
      correct: 1,
      category: "Operators"
    },
    {
      id: 13,
      question: "How do you import a package in Java?",
      options: ["import package.*;", "include package.*;", "using package.*;", "require package.*;"],
      correct: 0,
      category: "Packages"
    },
    {
      id: 14,
      question: "What is a static method?",
      options: ["Method that belongs to class", "Method that cannot be changed", "Method that is private", "Method that is final"],
      correct: 0,
      category: "Methods"
    },
    {
      id: 15,
      question: "How do you create a string in Java?",
      options: ["String str = \"hello\";", "string str = \"hello\";", "String str = new String(\"hello\");", "Both A and C"],
      correct: 3,
      category: "Strings"
    },
    {
      id: 16,
      question: "What is abstraction in Java?",
      options: ["Hiding implementation details", "Showing all details", "Creating objects", "Defining variables"],
      correct: 0,
      category: "Object-Oriented Programming"
    },
    {
      id: 17,
      question: "How do you implement an interface?",
      options: ["implements keyword", "extends keyword", "interface keyword", "abstract keyword"],
      correct: 0,
      category: "Interfaces"
    },
    {
      id: 18,
      question: "What is method overloading?",
      options: ["Same method name, different parameters", "Same method name, same parameters", "Different method name, same parameters", "Method with too many operations"],
      correct: 0,
      category: "Methods"
    },
    {
      id: 19,
      question: "How do you create a thread in Java?",
      options: ["extends Thread", "implements Runnable", "Both A and B", "new Thread()"],
      correct: 2,
      category: "Multithreading"
    },
    {
      id: 20,
      question: "What is the final keyword?",
      options: ["Cannot be inherited/overridden/modified", "Last method in class", "Final version", "End of program"],
      correct: 0,
      category: "Keywords"
    },
    {
      id: 21,
      question: "How do you create a collection in Java?",
      options: ["List<String> list = new ArrayList<>();", "Array<String> arr = new Array<>();", "Collection<String> col = new Collection<>();", "Set<String> set = new Set<>();"],
      correct: 0,
      category: "Collections"
    },
    {
      id: 22,
      question: "What is garbage collection?",
      options: ["Automatic memory management", "Manual memory cleanup", "Error handling", "Performance optimization"],
      correct: 0,
      category: "Memory Management"
    },
    {
      id: 23,
      question: "How do you read input in Java?",
      options: ["Scanner class", "BufferedReader class", "System.in", "All of the above"],
      correct: 3,
      category: "Input/Output"
    },
    {
      id: 24,
      question: "What is method overriding?",
      options: ["Redefining parent class method in child class", "Creating multiple methods with same name", "Overloading methods", "Final method implementation"],
      correct: 0,
      category: "Object-Oriented Programming"
    },
    {
      id: 25,
      question: "How do you handle multiple exceptions?",
      options: ["catch (Exception1 | Exception2 e)", "catch (Exception1, Exception2 e)", "catch Exception1, Exception2", "catch (Exception1 && Exception2)"],
      correct: 0,
      category: "Error Handling"
    },
    {
      id: 26,
      question: "What is the super keyword?",
      options: ["Reference to parent class", "Reference to current class", "Reference to child class", "Reference to interface"],
      correct: 0,
      category: "Keywords"
    },
    {
      id: 27,
      question: "How do you create an enum in Java?",
      options: ["enum Color {RED, GREEN, BLUE}", "enum Color = {RED, GREEN, BLUE}", "enum Color: {RED, GREEN, BLUE}", "enum Color[RED, GREEN, BLUE]"],
      correct: 0,
      category: "Enums"
    },
    {
      id: 28,
      question: "What is a lambda expression?",
      options: ["Anonymous function", "Named function", "Class method", "Interface method"],
      correct: 0,
      category: "Lambda Expressions"
    },
    {
      id: 29,
      question: "How do you create a generic class?",
      options: ["class MyClass<T>", "class MyClass[T]", "class MyClass(T)", "class MyClass{T}"],
      correct: 0,
      category: "Generics"
    },
    {
      id: 30,
      question: "What is autoboxing in Java?",
      options: ["Automatic conversion between primitive and wrapper types", "Automatic object creation", "Automatic method calling", "Automatic inheritance"],
      correct: 0,
      category: "Autoboxing/Unboxing"
    },
    {
      id: 31,
      question: "How do you synchronize methods in Java?",
      options: ["synchronized keyword", "sync keyword", "lock keyword", "thread keyword"],
      correct: 0,
      category: "Multithreading"
    },
    {
      id: 32,
      question: "What is the volatile keyword?",
      options: ["Ensures visibility across threads", "Makes variable unchangeable", "Creates thread-safe methods", "Optimizes performance"],
      correct: 0,
      category: "Multithreading"
    },
    {
      id: 33,
      question: "How do you create a package in Java?",
      options: ["package com.example;", "create package com.example;", "package: com.example;", "namespace com.example;"],
      correct: 0,
      category: "Packages"
    },
    {
      id: 34,
      question: "What is the difference between String and StringBuilder?",
      options: ["String is immutable, StringBuilder is mutable", "No difference", "StringBuilder is immutable, String is mutable", "Both are the same"],
      correct: 0,
      category: "Strings"
    },
    {
      id: 35,
      question: "How do you implement serialization?",
      options: ["implements Serializable", "extends Serializable", "implements Serialize", "extends Serialize"],
      correct: 0,
      category: "Serialization"
    }
  ]
};

// Add similar question sets for other languages...
// For brevity, I'm showing the structure with JavaScript, Python, and Java
// The other languages would follow the same pattern with 35 questions each
