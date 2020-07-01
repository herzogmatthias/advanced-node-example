jest.setTimeout(30000);

import { getKeys } from "../src/config/keys";
import { connect } from "mongoose";
import "../src/models/User";
import "../src/models/Blog";

const keys = getKeys()!;
// tslint:disable-next-line: no-var-requires
require("mongoose").Promise = global.Promise;
connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
