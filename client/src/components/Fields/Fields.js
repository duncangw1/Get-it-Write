import React, { useContext, useEffect, useState } from "react";
import {
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Fade,
  FormGroup,
  Input,
} from "reactstrap";
import { FieldsContext } from "../../contexts/fieldsContext";

const Fields = ({ fadeIn, categoryText }) => {
  const fields = useContext(FieldsContext);
  const proOptions = [
    `Hi,\n\nThanks for reaching out, but I'm not interested.\n\nBest regards, ${fields.fieldsAttributes.firstName}.`,
    `Hi,\n\nYou're spamming. I'm not interested, so please stop sending me email.\n\nBest regards, ${fields.fieldsAttributes.firstName}.`,
    `Hi,\n\nI'm enjoying a holiday at ${fields.fieldsAttributes.UNIQUE_LOCATION} and will be off the grid until the ${fields.fieldsAttributes.UNIQUE_DATE}! I'll get back to you that week.\nYou could also reach out to my colleagues via ${fields.fieldsAttributes.supportEmail}.\n\nThanks for your patience and talk to you then!\n\nBest regards,\n${fields.fieldsAttributes.fullName}`,
    `Hi,\n\nThanks for reaching out! Our support reps will check your message and forward it to the best person when necessary.\nWe'll get back to you within 48 hours.\nIf your issue can't wait, you can also reach us via live chat on ${fields.fieldsAttributes.supportWebsite} or call ${fields.fieldsAttributes.supportPhone}.\n\nBest regards,\n${fields.fieldsAttributes.fullName}`,
    `Hi ${fields.fieldsAttributes.UNIQUE_PERSON},\n\nHope you're doing well!\nI just wanted to follow up and ask whether you have any news on ${fields.fieldsAttributes.UNIQUE_SUBJECT}?\nLooking forward to hearing from you.\n\nBest regards, ${fields.fieldsAttributes.firstName}.`,
    `Hi ${fields.fieldsAttributes.UNIQUE_PERSON}, I am currently unavailable but I will get back to you about ${fields.fieldsAttributes.UNIQUE_SUBJECT} as soon as possible. I apologize for the inconvenience and appreciate your patience.`,
    `I'll get back to you about ${fields.fieldsAttributes.UNIQUE_SUBJECT} as soon as possible.`,
    `Thank you ${fields.fieldsAttributes.UNIQUE_PERSON} for the ${fields.fieldsAttributes.UNIQUE_SUBJECT}. I'll follow-up if I need additional info from you.`,
    `Hi ${fields.fieldsAttributes.UNIQUE_PERSON}, I'd like to setup a meeting to discuss ${fields.fieldsAttributes.UNIQUE_SUBJECT} on ${fields.fieldsAttributes.UNIQUE_DATE} at ${fields.fieldsAttributes.UNIQUE_TIME}. If this date and time does not work for you, please let me know when you're available to meet. Thank you!`,
    `Good ${fields.fieldsAttributes.UNIQUE_TIME} ${fields.fieldsAttributes.UNIQUE_PERSON}, I won't be able to make it in today as I am feeling unwell and have ${fields.fieldsAttributes.sickness}. I will keep you updated as the day progresses.`,
    `Good ${fields.fieldsAttributes.UNIQUE_TIME} ${fields.fieldsAttributes.UNIQUE_PERSON}, \n\nI would like to request an assignment extension for ${fields.fieldsAttributes.UNIQUE_SUBJECT} due to ${fields.fieldsAttributes.reasoning}. I apologize for the delay on this assignment.\nPlease let me know if there are any issues with this.\nThank you for your assistance.\n\nBest Regards,\n${fields.fieldsAttributes.fullName}`,
    `Good ${fields.fieldsAttributes.UNIQUE_TIME} ${fields.fieldsAttributes.UNIQUE_PERSON}, \n\nI would like to request office hours for ${fields.fieldsAttributes.UNIQUE_DATE} at ${fields.fieldsAttributes.UNIQUE_TIME}. If this day and time does not fit your schedule, please let me know your availability.\nThank you for your time.\n\nBest Regards,\n${fields.fieldsAttributes.fullName}`,
    `Good ${fields.fieldsAttributes.UNIQUE_TIME} ${fields.fieldsAttributes.UNIQUE_PERSON}, \n\nUnfortunately I will not be able to make it to class on ${fields.fieldsAttributes.UNIQUE_DATE} and I must request an absence. Please let me know if this will be an issue.\n\nBest Regards,\n${fields.fieldsAttributes.fullName}`,
    `Good ${fields.fieldsAttributes.UNIQUE_TIME} ${fields.fieldsAttributes.UNIQUE_PERSON}, \n\nI have a question about ${fields.fieldsAttributes.UNIQUE_SUBJECT}. Could you please provide assistance with this?\nThank you for your time.\n\n\nBest Regards,\n${fields.fieldsAttributes.fullName}`,
  ];

  const [currentFields, setCurrentFields] = useState([]);

  useEffect(() => {
    fields.dispatch({ type: "RESET" });
    if (proOptions[categoryText] === "") {
      return;
    } else {
      const searchPattern = /{{([^}]+)}}/g;
      let tempFields = [];
      let i;
      while ((i = searchPattern.exec(proOptions[categoryText]))) {
        tempFields.push("{{" + i[1] + "}}");
      }
      setCurrentFields(tempFields);
    }
  }, [categoryText]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    name = `${name.slice(2).slice(0, -2)}`;
    fields.dispatch({ type: name, value });
    // console.log(fields.fieldsAttributes.UNIQUE_LOCATION);
  };

  return (
    <div style={{ backgroundColor: "#f6f5f5", height: "100%" }}>
      <CardHeader tag="h4">Fields</CardHeader>
      <CardBody>
        <Container>
          {/* <Col>
            <Fade in={!fadeIn}>
              <Row>
                <p>Please choose a category to view related input fields.</p>
              </Row>
            </Fade>
          </Col> */}
          <Fade in={fadeIn} className="mt-3">
            <FormGroup row>
              <Col sm={12}>
                {currentFields.map((field, k) => {
                  return (
                    <Input
                      className="mb-2"
                      type="text"
                      name={field}
                      key={k}
                      id={k}
                      placeholder={field}
                      onChange={handleInputChange}
                    />
                  );
                })}
              </Col>
            </FormGroup>
          </Fade>
        </Container>
      </CardBody>
    </div>
  );
};

export default Fields;
