import {Link } from 'react-router-dom'
import { ReactComponent as PlusButton } from '../plus.svg'

const AddNote = () => {
  return (
    <div>
        <Link className='floating-button' to='/note/new'>
          <PlusButton />
        </Link>

    </div>
  )
}

export default AddNote
