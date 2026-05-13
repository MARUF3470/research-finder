import { Papers } from '@/types/ResultTypes'
import TableLayout from './TableLayout'

const SavedPapersOutput = ({results}:{results:Papers[]}) => {
  return (
    <div><TableLayout papers={results} /></div>
  )
}

export default SavedPapersOutput