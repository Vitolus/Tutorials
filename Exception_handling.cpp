/******************************************************************************
Little program to understand exception handling
*******************************************************************************/

#include <iostream>
#include <vector>
using namespace std;

int main(){
  cout<< "Creating a vector of size 5\n";
  vector<int> v= {0, 1, 2, 3, 4};
  try{
    cout<< "Accessing the 11th element of the vector\n";
    cout<< v.at(10) << endl; //vector::at() throws std::out_of_range
  }catch(const exception&){	//caught by reference to base
    cout<< "Out of range\n";
    cout<< "Accessing the back element of vector inside catch\n";
    cout<< v.back() << endl;
  }
  cout<< "Accessing the front element of vector outside catch\n";
  cout<< v.front() << endl;
  return 0;
}
