import React, { useEffect, useState } from "react";
import { Textarea, Spacer } from "@nextui-org/react";
import { TiDeleteOutline } from "react-icons/ti";

type TObj = {
  fromNoApp: string[] | [];
  noNotified: string[] | [];
};

function InputTagPeopleOutside({
  setSelections,
  onEditionProp,
}: {
  setSelections: (obj: TObj) => void;
  onEditionProp: TObj;
}) {
  const [mailsString, setMailsString] = useState<string>("");
  const [namesString, setNamesString] = useState<string>("");
  const [mails, setMails] = useState<string[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [obj, setObj] = useState<TObj>({
    fromNoApp: [],
    noNotified: [],
  });

  useEffect(() => {
    if (onEditionProp) {
      // setMails(onEditionProp.fromNoApp);
      // setNames(onEditionProp.noNotified);
      // setObj(onEditionProp);
      setMailsString(onEditionProp.fromNoApp.join(" "))
      setNamesString(onEditionProp.noNotified.join(" "))
      setMails(onEditionProp.fromNoApp);
      setNames(onEditionProp.noNotified);
      setObj(onEditionProp);
    }
  }, [onEditionProp]);

  const handleMails = (e: string) => {
    let usersEmails = e.split(" ")
    // if(e.includes(" ")){
    //   usersEmails = e.split(" ");
    // }
    // const updatedMails = [...mails, ...usersEmails as string[]];
    // setMails(updatedMails);
    // const newObj = { ...obj, fromNoApp: updatedMails };
    // setObj(newObj);
    // setSelections(newObj);
    setMails(usersEmails)
    setObj({...obj, fromNoApp: usersEmails})
    setSelections({...obj, fromNoApp: usersEmails})
  };

  const handleNames = (e: string) => {
    let usersNames = e.split(" ");
    // const updatedNames = [...names, ...usersNames];
    // setNames(updatedNames);
    // const newObj = { ...obj, noNotified: updatedNames };
    // setObj(newObj);
    // setSelections(newObj);
    setMails(usersNames)
    setObj({...obj, noNotified: usersNames})
    setSelections({...obj, noNotified: usersNames})
  };

  const handleDeleteName = (nme: string) => {
    const newResults = names.filter((name) => name !== nme);
    setNames(newResults);
    setSelections({ ...obj, noNotified: newResults });
  };

  const handleDeleteMail = (email: string) => {
    const newResults = mails.filter((mail) => mail !== email);
    setMails(newResults);
    setSelections({ ...obj, fromNoApp: newResults });
  };

  return (
    <div className="w-full">
      <Textarea
        type="text"
        label="Tag someone outside of the app (will be notified)"
        placeholder="example-one@gmail.com example-two@outlook.com"
        onChange={(e) => handleMails(e.target.value)}
        value={mailsString}
      />
      <Spacer y={3} />
      <Textarea
        type="text"
        label="Tag the name of the person you dreamed (won't be notified)"
        placeholder="William Roberto Richard"
        onChange={(e) => handleNames(e.target.value)}
        value={namesString}
      />
      <div className="w-full flex flex-col gap-2 items-start justify-center text-[10px] border-1x rounded-lg py-2 px-4 flex-wrap">
        <div className="w-full flex gap-1 justify-start items-center flex-wrap">
          <p className="w-full font-semibold">People who will be notified:</p>
          <div className="w-full flex gap-1 flex-wrap">
            {mails.length <= 0
              ? "No emails added..."
              : mails.map((mail) => (
                  <div
                    key={`name-out-key-${mail}`}
                    className=" py-0.5 px-1.5 border-1 rounded-lg border-violet-600 text-sm flex gap-1.5"
                  >
                    {mail}
                    <div
                      className="flex justify-center item-center cursor-pointer"
                      onClick={() => handleDeleteMail(mail)}
                    >
                      <TiDeleteOutline size={20} className=" text-red-500 " />
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="w-full flex gap-1 justify-start items-center flex-wrap">
          <p className="w-full font-semibold">
            People tagged but not notified:
          </p>
          <div className="w-full flex gap-1 flex-wrap">
            {names.length <= 0
              ? "No users added..."
              : names.map((name) => (
                  <div
                    key={`name-out-key-${name}`}
                    className=" py-0.5 px-1.5 border-1 rounded-lg border-violet-600 text-sm flex gap-1.5"
                  >
                    {name}
                    <div
                      className="flex justify-center item-center cursor-pointer"
                      onClick={() => handleDeleteName(name)}
                    >
                      <TiDeleteOutline size={20} className=" text-red-500 " />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputTagPeopleOutside;
