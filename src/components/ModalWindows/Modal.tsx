import React, { ReactElement, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { addNewTrainingTime } from '../../store/actions/systemActions'
import { ITraining } from '../../types/mainSystem'
import './styles.css'

// интерфейс для пропсов
interface ModalProps {
    visible: boolean
    myTrainingsArr: ITraining[]
    onClose: () => void
  }
  
  const Modal = ({ visible = false, onClose, myTrainingsArr }: ModalProps) => {
    const [fields, setFields] = useState({ dateField: "", linkField: "", trainingIdField: -1 })
    const dispatch = useDispatch()
    // создаем обработчик нажатия клавиши Esc
    const onKeydown = ({ key }: KeyboardEvent) => {
      switch (key) 
      {
        case 'Escape': onClose(); break
      }
    }
  
    // c помощью useEffect цепляем обработчик к нажатию клавиш
    React.useEffect(() => {
      document.addEventListener('keydown', onKeydown)
      return () => document.removeEventListener('keydown', onKeydown)
    })

    // если компонент невидим, то не отображаем его
    if (!visible) return null

  // или возвращаем верстку модального окна
  return (
    <div className='modal' onClick={onClose}>
      <div className='modal-dialog' onClick={e => e.stopPropagation()}>
        <div className='modal-body'>
          <div className='modal-content'>
              <form onSubmit={ (e: React.FormEvent) => { e.preventDefault(); dispatch(addNewTrainingTime(fields.trainingIdField, fields.dateField, fields.linkField)) } } className="d-flex flex-wrap align-content-between" style={{ height: "100%" }}>
                <div className="align-self-start" style={{ display: "block" }}>
                    <span >Дата и время начала</span>
                    <input type={"datetime-local"}
                           className="border-0"
                           style={{backgroundColor: "#f5f5f5"}}
                           value={fields.dateField}
                           onChange={ (e) => { setFields({ ...fields, dateField: e.target.value}) } } />
                </div>
                <div className="align-self-end" style={{ display: "block" }}>
                    <span>Ссылка на конференцию</span>
                    <input type={'text'}
                           className="border-0"
                           style={{backgroundColor: "#f5f5f5"}}
                           placeholder={'https://www.zoom.com'}
                           value={fields.linkField}
                           onChange={ (e) => { setFields({ ...fields, linkField: e.target.value}) } }/>
                </div>
                <div className="align-self-end" style={{ display: "block" }}>
                <select className="form-select border-0"
                        style={{backgroundColor: "#f5f5f5"}}
                        onChange={event => setFields({...fields, trainingIdField: parseInt(event.target.value) })}
                        required>
                    <option value="" disabled selected>Название курса</option>
                    {myTrainingsArr.map( (training:ITraining) => { return ( <option key={training.id} value={training.id}>{training.title}</option> ) } )}
                    
                </select>
                </div>
                <button className="align-self-end btn mx-auto " style={{ display: "block", backgroundColor: "#2A324B", color: "white" }} >Назначить</button>
              </form>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Modal;