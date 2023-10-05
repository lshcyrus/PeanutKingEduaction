/* This React component is to display the codes for a step.
   It uses the AceEditor component from the react-ace library.
*/

// some of the libraries are not used
import AceEditor from 'react-ace';                      // required
import 'ace-builds/src-noconflict/mode-c_cpp';          // required
import 'ace-builds/src-noconflict/theme-textmate';      // required
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/ext-spellcheck';
import 'ace-builds/src-noconflict/ext-settings_menu';
import 'ace-builds/src-noconflict/ext-error_marker';
import 'ace-builds/src-noconflict/ext-statusbar';
import 'ace-builds/src-noconflict/ext-emmet';
import 'ace-builds/src-noconflict/ext-elastic_tabstops_lite';
import 'ace-builds/src-noconflict/ext-whitespace';
import 'ace-builds/src-noconflict/ext-keybinding_menu';
import 'ace-builds/src-noconflict/ext-textarea';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-options';
import 'ace-builds/src-noconflict/ext-prompt';

const CodeViewer = (props) => {
    return (
        <AceEditor
            key={props.id}
            mode="c_cpp"
            theme="textmate"
            fontSize={18}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={props.code}
            readOnly={true}
            width='100%'
            placeholder='NO CODE TO DISPLAY 沒有任何代碼'
            />
    )
}
export default CodeViewer;
