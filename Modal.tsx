import { useState } from 'react';
import './Modal.css';

type Friend = {
  name: string;
  email: string;
  phone: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ isOpen, onClose }: ModalProps) {
  const [eventType, setEventType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactType, setContactType] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);

  if (!isOpen) return null;

  const handleAddFriend = () => {
    if (friends.length >= 3) return;
    setFriends([...friends, { name: '', email: '', phone: '' }]);
  };

  const handleFriendChange = (index: number, field: keyof Friend, value: string) => {
    const updated = [...friends];
    updated[index][field] = value;
    setFriends(updated);
  };

  const handleSubmit = () => {
    console.log({ eventType, name, email, phone, contactType, friends });
    alert('Форма отправлена (ну почти)');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Заявка на регистрацию для мероприятия</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="form-group">
          <label>Тип мероприятия *</label>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="">Выберите вид мероприятия</option>
            <option value="team-building">Тимбилдинг</option>
            <option value="hackathon">Хакатон</option>
            <option value="пикник">Пикник</option>
          </select>
        </div>

        <div className="form-group">
          <label>ФИО *</label>
          <input
            type="text"
            placeholder="Введите ФИО"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Имейл *</label>
          <input
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Номер телефона *</label>
          <input
            type="tel"
            placeholder="+7 777 77 77"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="add-friend-section">
          <button onClick={handleAddFriend}>+ Добавить друга</button>
          {friends.map((friend, index) => (
            <div className="friend-fields" key={index}>
              <input
                type="text"
                placeholder="ФИО друга"
                value={friend.name}
                onChange={(e) => handleFriendChange(index, 'name', e.target.value)}
              />
              <input
                type="email"
                placeholder="Email друга"
                value={friend.email}
                onChange={(e) => handleFriendChange(index, 'email', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Телефон друга"
                value={friend.phone}
                onChange={(e) => handleFriendChange(index, 'phone', e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Предпочитаемый вид связи *</label>
          <select value={contactType} onChange={(e) => setContactType(e.target.value)}>
            <option value="">Выберите способ связи</option>
            <option value="email">Email</option>
            <option value="telegram">Telegram</option>
            <option value="звонок">Телефонный звонок</option>
          </select>
        </div>

        <div className="modal-buttons">
          <button className="btn-secondary" onClick={onClose}>Назад</button>
          <button className="btn-primary" onClick={handleSubmit}>Дальше</button>
        </div>
      </div>
    </div>
  );
}
