import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunction";
import ArrowFunctions from "./ArrowFunctions";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";

export default function Lab3() {
    return (
        <div>
            <h2>Lab 3</h2>
            <VariablesAndConstants />
            <VariableTypes />
            <BooleanVariables />
            <IfElse />
            <TernaryOperator />
            <ConditionalOutputIfElse />
            <ConditionalOutputInline /> <hr />
            <LegacyFunctions /> 
            <ArrowFunctions />
            <TemplateLiterals />
            <SimpleArrays />
        </div>
    );
}