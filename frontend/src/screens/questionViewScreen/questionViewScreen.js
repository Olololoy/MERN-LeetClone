import CodeArea from './components/codeArea/codeArea';
import QVSHeader from './components/header/qvsHeader';
import QuestionDescriptionWindow from './components/questionDescription/questiondescription';
import './styles.css';

function QuestionViewScreen() {
    return (
        <div className='QVSparentDiv'>
            <QVSHeader/>
            <div className='contentDiv'>
                <QuestionDescriptionWindow/>
                <CodeArea/>
            </div>
        </div>
);
}

export default QuestionViewScreen;