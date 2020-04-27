import React from "react";

//TODO User can only vote once per question
export default function QuestionOveview(props) {
  const { name, avatar, optionOne, optionTwo, id } = props.question;

  return (
    <div>
      <span>
        <h3>Asked by {name}</h3>
      </span>

      <img
        src={avatar}
        alt={name}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          objectFit: "cover",
        }}
      />

      <div>
        <h4>Result</h4>
        <div>
          <p>Would you rather {optionOne.text}</p>
          {/*TODO: Make a percentage view*/}
          <p>
            {optionOne.lenght} out of {optionOne.lenght + optionOne.lenght}
          </p>
        </div>
        <div>
          <p>Would you rather {optionTwo.text}</p>
          {/*TODO: Make a percentage view*/}

          <p>
            {optionTwo.lenght} out of {optionOne.lenght + optionOne.lenght}
          </p>
        </div>
      </div>
    </div>
  );
}
