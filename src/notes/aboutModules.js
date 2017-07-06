//Import and export 

//file1.js
        // const firstname = 'robin';
        // const lastname = 'wieruch';

        // export { firstname, lastname };

//Import everything as one obj person
        //import * as person from './file1.js';


// It can happen that you import functionalities from multiple files that have the same named export.
// That's why you can use an alias.

        //import { firstname as foo } from './file1.js';

// Last but not least there exists the default statement. It can be used for a few use cases:

// to export and import a single functionality
// to highlight the main functionality of the exported API of a module
// to have a fallback import functionality

//Note that in this case inport can differ from exported default name
