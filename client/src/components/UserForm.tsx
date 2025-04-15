import React, { useState } from "react";
import CryptoJS from "crypto-js";

type Props = {
  onSave: () => void;
};

const UserForm: React.FC<Props> = ({ onSave }) => {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");

  const handleSave = () => {
    if (!fullName || !company || !contact) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const userData = { fullName, company, contact };
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(userData),
      "super-secret-key"
    ).toString();

    localStorage.setItem("user_data", encrypted);
    onSave();
  };

  return (
    <div>
      <h2>Введите данные пользователя:</h2>
      <input
        placeholder="ФИО"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <br />
      <input
        placeholder="Компания"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br />
      <input
        placeholder="Контакт"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <br />
      <button onClick={handleSave}>Сохранить и перейти к калькулятору</button>
    </div>
  );
};

export default UserForm;
