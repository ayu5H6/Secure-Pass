import React, { useCallback, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Generator = () => {
  const [length, setLength] = useState(6);
  const [NumbersAllowed, setNumbersAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState("");
  const [userName, setUserName] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumbersAllowed) str += "123456789";
    if (CharAllowed) str += "()%$#@!^_{}[]/";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass = str.charAt(char) + pass;
    }
    setPassword(pass);
  }, [length, NumbersAllowed, CharAllowed, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const savePassword = () => {
    if (website.trim() && password.trim() && userName.trim()) {
      const newPassword = { website, userName, password };
      setPasswords((prev) => [...prev, newPassword]);
      setWebsite("");
      setPassword("");
      setUserName("");
      passwordGenerator();
    } else {
      alert("Please enter a website name and password before saving.");
    }
  };

  const downloadPasswords = () => {
    const passwordData = passwords
      .map((entry) => {
        return `Website: ${entry.website}\nUsername: ${entry.userName}\nPassword: ${entry.password}\n\n`;
      })
      .join("");

    const blob = new Blob([passwordData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "passwords.txt";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, NumbersAllowed, CharAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full sm:w-11/12  lg:w-8/12 mx-auto bg-amber-400 px-4 py-3 my-8 shadow-md rounded-lg font-mono">
        <h1 className="text-4xl text-center my-3">Password Generator</h1>
        <div className="flex flex-col sm:flex-row shadow rounded-lg overflow-hidden mb-4 bg-amber-200 justify-center  p-4">
          <motion.input
            whileHover={{ scale: 1.1 }}
            whileFocus={{ borderColor: "brown", scale: 1.1 }}
            type="text"
            value={password}
            className="border-2 my-2 text-red-700 w-full sm:w-auto py-1 px-3 mx-3 outline-none  text-xl"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <motion.button
            whileHover={{ backgroundColor: "crimson", scale: 1.1 }}
            className="w-full  sm:w-32 rounded-lg px-3 py-1 text-xl mx-3 mb-2 sm:mb-0 crimson "
            onClick={copyToClipBoard}
          >
            Copy
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: "royalBlue", scale: 1.1 }}
            className="w-full mx-3 rounded-lg sm:w-32 px-3 py-1 text-xl royalBlue"
            onClick={passwordGenerator}
          >
            Randomizer
          </motion.button>
        </div>
        <div className="flex flex-col sm:flex-row text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <motion.input
              whileHover={{ scale: 1.1 }}
              type="range"
              min={6}
              max={16}
              className="cursor-pointer text-xl w-full sm:w-auto"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length" className="text-xl mx-2 ">
              Length : {length}
            </label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input
              type="checkbox"
              defaultChecked={NumbersAllowed}
              className="w-6 h-6 "
              id="numberInput"
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numbers" className="text-xl mx-2">
              Number
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="numberInput"
              className="w-6 h-6"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characters" className="text-xl">
              Characters
            </label>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-11/12 lg:w-8/12 mx-auto bg-amber-400 px-4 py-3 my-8 shadow-md rounded-lg font-mono">
        <h1 className="text-center text-xl sm:text-4xl my-4 mx-2">
          Password Manager
        </h1>
        <div className="flex flex-col sm:flex-row shadow rounded-lg overflow-hidden mb-4 bg-amber-200 p-4">
          <motion.input
           
            whileFocus={{ borderColor: "brown", scale: 1.1 }}
            type="text"
            value={website}
            placeholder="Website Name"
            className="outline-none p-2 sm:w-full text-red-700  border-2 mx-4 my-2 text-xl"
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          />
          <motion.input
            
            whileFocus={{ borderColor: "brown", scale: 1.1 }}
            type="text"
            value={userName}
            placeholder="User Name"
            className="outline-none sm:w-full text-red-700 my-2 p-2 border-2 mx-7 text-xl"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <motion.button
            whileHover={{ backgroundColor: "yellowgreen", scale: 1.1 }}
            onClick={savePassword}
            className="w-full sm:w-auto rounded-lg outline-none yellowgreen shrink-0 px-3 py-1"
          >
            Save Password
          </motion.button>
        </div>
        <div className="my-4 w-full">
          <h2 className="text-xl">Saved Passwords:</h2>
          {passwords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full sm:w-11/12 lg:w-8/12 mx-auto">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-2 px-4 border-b">Website</th>
                    <th className="py-2 px-4 border-b">UserName</th>
                    <th className="py-2 px-4 border-b">Password</th>
                  </tr>
                </thead>
                <tbody className="text-center text-gray-700 bg-gray-200">
                  {passwords.map((entry, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-4">{entry.website}</td>
                      <td className="py-2 px-4">{entry.userName}</td>
                      <td className="py-2 px-4">{entry.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No passwords yet.</p>
          )}
        </div>

        {passwords.length > 0 && (
          <motion.button
            whileHover={{ backgroundColor: "green", scale: 1.1 }}
            onClick={downloadPasswords}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Download Passwords
          </motion.button>
        )}
      </div>
    </>
  );
};

export default Generator;
